import Link from "next/link";
export default function Confirmation() {
  return (
    <div className="shell empty-state">
      <span className="eyebrow">ORDER STATUS</span>
      <h1>No confirmed order to show.</h1>
      <p>
        Online order processing is not available yet. Your selection stays in
        your bag until checkout is ready.
      </p>
      <Link className="button" href="/cart">
        Return to your bag →
      </Link>
    </div>
  );
}
