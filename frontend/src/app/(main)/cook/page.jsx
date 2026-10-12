"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
export default function Cook() {
  const { user } = useAuth();
  const [values, setValues] = useState({
    product: "Black Tiger Prawns",
    cuisine: "Bengali",
    spice: "Medium",
    method: "Stovetop",
    servings: "2",
    avoid: "",
    revision: "",
  });
  const [recipe, setRecipe] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const change = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });
  async function generate(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/ai-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRecipe(data.recipe);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="shell recipe-studio">
      <div className="studio-heading">
        <span className="eyebrow">THE WAVE KITCHEN · COOK WITH AI</span>
        <h1>
          Good ingredients.
          <br />
          <em>Your imagination.</em>
        </h1>
        <p>
          A little inspiration for tonight. Choose your catch, make it your own,
          and let’s cook something lovely.
        </p>
      </div>
      <div className="studio-grid">
        <form className="fields studio-controls" onSubmit={generate}>
          <h2>What are you in the mood for?</h2>
          <label>
            Your catch
            <input
              name="product"
              value={values.product}
              onChange={change}
              maxLength={120}
              required
            />
          </label>
          <div className="field-grid">
            {[
              [
                "cuisine",
                "Cuisine",
                [
                  "Bengali",
                  "Coastal Indian",
                  "Mediterranean",
                  "Thai",
                  "Japanese",
                ],
              ],
              ["spice", "Spice", ["Mild", "Medium", "Hot"]],
              [
                "method",
                "Cooking method",
                ["Stovetop", "Oven", "Grill", "Air fryer"],
              ],
              ["servings", "Servings", ["1", "2", "3", "4", "6"]],
            ].map(([name, label, options]) => (
              <label key={name}>
                {label}
                <select name={name} value={values[name]} onChange={change}>
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <label>
            Ingredients to avoid
            <input
              name="avoid"
              value={values.avoid}
              onChange={change}
              placeholder="For example, dairy or peanuts"
              maxLength={500}
            />
          </label>
          <label>
            Make it yours
            <textarea
              name="revision"
              value={values.revision}
              onChange={change}
              placeholder="Less oil, extra vegetables, ready in 20 minutes…"
              maxLength={500}
              rows={3}
            />
          </label>
          {user ? (
            <button className="button" disabled={busy}>
              {busy
                ? "Preparing your recipe…"
                : recipe
                  ? "Create a new variation →"
                  : "Create my recipe →"}
            </button>
          ) : (
            <Link className="button" href="/login?next=%2Fcook">
              Sign in to create a recipe →
            </Link>
          )}
          {error && <p role="alert">{error}</p>}
          <p className="small-note">
            AI can make mistakes. Check every ingredient against your dietary
            needs and follow safe food-handling practices.
          </p>
        </form>
        <div className="recipe-result" aria-live="polite">
          {recipe ? (
            <>
              <span className="eyebrow">YOUR RECIPE · {recipe.minutes}</span>
              <h2>{recipe.title}</h2>
              <p>{recipe.intro}</p>
              <label className="recipe-edit">
                Ingredients · editable
                <textarea
                  value={recipe.ingredients.join("\n")}
                  onChange={(e) =>
                    setRecipe({
                      ...recipe,
                      ingredients: e.target.value.split("\n"),
                    })
                  }
                  rows={recipe.ingredients.length + 1}
                />
              </label>
              <h3>Let’s cook</h3>
              <ol>
                {recipe.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <p>{recipe.note}</p>
              <p className="small-note">
                Change any preference to generate a new variation.
              </p>
            </>
          ) : (
            <div className="recipe-empty">
              <span className="kitchen-mark" aria-hidden="true">
                ✳
              </span>
              <span className="eyebrow">MADE FOR YOUR TABLE</span>
              <h2>
                A new favourite
                <br />
                is waiting.
              </h2>
              <p>
                Your recipe will appear here.
                <br />A coastal curry? A quick weeknight grill?
                <br />
                You set the direction.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
