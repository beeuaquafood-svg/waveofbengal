import { NextResponse } from 'next/server';

// Robust Bay of Bengal culinary recipe generator for seamless fallback
function generateSmartRecipe({
    productName = 'Bengal Tiger Prawns',
    category = 'Seafood',
    description = '',
    allergies = [],
    cuisinePreference = '',
    spiceLevel = 'Medium',
    cookingStyle = '',
}) {
    const pLower = (productName + ' ' + category).toLowerCase();
    const styleLower = (cookingStyle || '').toLowerCase();
    const cuisine = cuisinePreference || 'Bengali';
    const isMustardAllergic = allergies.some(a => a.toLowerCase().includes('mustard'));
    const isDairyAllergic = allergies.some(a => a.toLowerCase().includes('dairy') || a.toLowerCase().includes('milk'));
    const isGlutenAllergic = allergies.some(a => a.toLowerCase().includes('gluten'));
    const isNutAllergic = allergies.some(a => a.toLowerCase().includes('nut'));

    // Select fat/oil respecting allergies
    const cookingOil = isMustardAllergic ? 'Cold-pressed coconut oil or mustard-free vegetable oil' : 'Cold-pressed virgin mustard oil (or ghee/oil of choice)';
    const creamyBase = isDairyAllergic ? 'Rich fresh coconut milk' : 'Velvety coconut cream and whipped malai yogurt';

    let recipeName = '';
    let intro = '';
    let prepTime = '15 mins';
    let cookTime = '20 mins';
    let serves = '2 - 3';
    let ingredients = [];
    let steps = [];
    let otherDishes = [];
    let chefTip = '';

    if (pLower.includes('prawn') || pLower.includes('chingri') || pLower.includes('shrimp')) {
        if (cuisine === 'Bengali' || !cuisinePreference) {
            recipeName = isDairyAllergic ? 'Royal Daab Chingri in Tender Coconut Shell' : 'Grand Shorshe Chingri Malai Royale';
            intro = `A revered Bay of Bengal delicacy pairing sweet, juicy ${productName} with luscious ${isMustardAllergic ? 'aromatic coconut' : 'shorshe (mustard) and coconut'} gravy, infused with slit green chilies and nigella seeds.`;
            prepTime = '15 mins';
            cookTime = '18 mins';
            ingredients = [
                `500g fresh ${productName}, deveined with tails intact`,
                `2 tbsp ${cookingOil}`,
                `1 cup ${creamyBase}`,
                isMustardAllergic ? '1 tbsp freshly grated ginger & cumin paste' : '2 tbsp freshly ground yellow & black mustard paste (soaked with sea salt)',
                '4 green chilies, slit lengthwise',
                '1/2 tsp wild nigella seeds (kalo jeere / kalonji)',
                '1/2 tsp organic turmeric powder',
                '1/2 tsp Kashmiri red chili powder for deep amber color',
                '1 tsp pure jaggery or organic raw sugar (balances savoriness)',
                'Himalayan pink salt to taste',
                'Handful of freshly chopped coriander leaves'
            ];
            steps = [
                `Marinate cleaned ${productName} with a pinch of turmeric, salt, and 1 tsp of ${cookingOil} for 8 minutes.`,
                `Heat 2 tbsp of ${cookingOil} in a heavy-bottomed kadai until gently shimmering. Flash-sear prawns for 60-90 seconds until they curl into a golden 'C' shape; remove promptly to avoid toughening.`,
                `In the remaining aromatic oil, temper nigella seeds and slit green chilies until fragrant and crackling.`,
                `Whisk ${isMustardAllergic ? 'ginger-cumin paste' : 'mustard paste'} with turmeric, chili powder, and 3 tbsp water to prevent scorching. Pour into kadai and sauté on low heat for 2 minutes.`,
                `Stir in ${creamyBase} and simmer gently until the gravy emulsifies and tiny golden beads of oil rise to the perimeter.`,
                `Slide the seared ${productName} back into the simmering sauce. Cover and cook on gentle flame for 3-4 minutes so flavors permeate the shellfish.`,
                `Drizzle a final teaspoon of fragrant oil, scatter freshly slit green chilies, and serve piping hot over fragrant steamed Gobindobhog or Basmati rice.`
            ];
            otherDishes = [
                { name: 'Ghee Roasted Tiger Prawns', description: 'Dry-roasted in aromatic spiced ghee with curry leaves and black pepper.' },
                { name: 'Chingri Cutlet with Kasundi', description: 'Crisp Bengal-style crumbed cutlets served with fermented mustard dip.' },
                { name: 'Coconut Leaf Steamed Prawns', description: 'Wrapped in tender banana leaf and slow-steamed with poppy seed paste.' },
                { name: 'Lau Chingri (Bottle Gourd Medley)', description: 'Classic comfort stew pairing sweet tender gourds with succulent prawns.' }
            ];
            chefTip = `Never overcook premium ${productName}. When prawns curl into a 'C' they are cooked to succulent perfection; if they curl into an 'O' they are beginning to overcook.`;
        } else if (cuisine === 'Continental') {
            recipeName = 'Garlic Herb Butter Poached ' + productName;
            intro = `Sweet, ocean-fresh ${productName} bathed in a silky emulsion of clarified butter, roasted garlic confit, and crisp flat-leaf parsley.`;
            prepTime = '10 mins';
            cookTime = '12 mins';
            ingredients = [
                `500g premium ${productName}`,
                isDairyAllergic ? '3 tbsp extra virgin olive oil' : '4 tbsp organic clarified butter (ghee or unsalted butter)',
                '6 cloves garlic, thinly shaved',
                '1 tbsp freshly squeezed Meyer lemon juice',
                '1/4 cup dry white reduction broth or vegetable stock',
                'Freshly cracked tellicherry black pepper & sea salt flakes',
                'Finely chopped Italian flat-leaf parsley'
            ];
            steps = [
                `Pat ${productName} completely dry with kitchen paper to ensure a tender sear.`,
                `Gently warm the fat in a skillet over medium-low heat. Add shaved garlic and warm until pale golden and fragrant.`,
                `Add ${productName} in a single layer. Sauté for 2 minutes per side until flesh turns translucent pink.`,
                `Deglaze with broth and fresh lemon juice, swirling the pan rapidly to emulsify the pan juices into a silky glaze.`,
                `Season with sea salt flakes and freshly cracked black pepper. Finish with chopped parsley and serve with artisan sourdough or wild rice.`
            ];
            otherDishes = [
                { name: 'Lemon Pepper Grilled Skewers', description: 'Charred skewers brushed with citrus glaze and coastal herbs.' },
                { name: 'Creamy Seafood Saffron Bisque', description: 'Silky, aromatic shellfish bisque infused with Spanish saffron.' },
                { name: 'Chili Crisp Tossed Prawns', description: 'Wok-tossed with shallot oil and artisan chili crisps.' },
                { name: 'Seafood Paella Bengal', description: 'Short-grain rice simmered with Bay of Bengal prawns and spices.' }
            ];
            chefTip = `Poaching the shellfish on gentle heat allows the natural sweetness of the Bay of Bengal ocean waters to shine through.`;
        } else {
            recipeName = `Coastal Fiery ${productName} Masala`;
            intro = `A spicy coastal pan-roast combining roasted spices, caramelized shallots, and succulent shellfish.`;
            prepTime = '12 mins';
            cookTime = '15 mins';
            ingredients = [
                `500g fresh ${productName}`,
                `2 tbsp ${cookingOil}`,
                '1 sprig fresh curry leaves',
                '1 cup finely minced shallots',
                '1.5 tsp roasted coriander-cumin-fennel blend',
                '1 tsp freshly crushed black peppercorns',
                '1 tbsp crushed ginger-garlic paste',
                '1/2 tsp turmeric powder',
                'Himalayan sea salt to taste'
            ];
            steps = [
                `Toss ${productName} with turmeric, salt, and lemon juice; set aside for 5 minutes.`,
                `Heat ${cookingOil} in a pan, toss in curry leaves and crackle, followed by shallots until deep golden.`,
                `Add ginger-garlic paste and cook till raw aroma departs. Add dry ground spices and roast for 60 seconds.`,
                `Fold in the shellfish. Sear on high flame for 3 minutes, coating every morsel in the caramelized masala.`,
                `Reduce flame, cover for 2 minutes to let juices release, then uncover and roast until dry and glossy.`
            ];
            otherDishes = [
                { name: 'Prawn Balchão', description: 'Tangy, spicy Goan-Portuguese pickled shellfish delicacy.' },
                { name: 'Tandoori Smoked Skewers', description: 'Marinated in smoked yogurt and clay-oven charred.' },
                { name: 'Prawn Biryani', description: 'Layers of dum rice and spiced Bay prawns.' },
                { name: 'Crispy Pepper Salt Toss', description: 'Quick wok-tossed appetizer with bell peppers and spring onion.' }
            ];
            chefTip = `Using fresh whole curry leaves crackled in warm oil unlocks fragrant essential oils that elevate the seafood flavor.`;
        }
    } else if (pLower.includes('ilish') || pLower.includes('hilsa')) {
        recipeName = isMustardAllergic ? 'Doi Ilish Bhapa (Steamed Hilsa in Whipped Curd)' : 'Traditional Shorshe Ilish (Mustard Steamed Hilsa)';
        intro = `The undisputed queen of Bengal waters — buttery, rich Hilsa simmered gently in ${isMustardAllergic ? 'whipped spiced curd' : 'sharp freshly stone-ground mustard paste'} and green chilies.`;
        prepTime = '15 mins';
        cookTime = '15 mins';
        ingredients = [
            `4-5 thick darnes (steaks) of prime ${productName}`,
            `2 tbsp cold-pressed virgin mustard oil`,
            isMustardAllergic ? '3/4 cup whipped hung curd with ginger juice' : '3 tbsp yellow & black mustard seed paste ground with green chili and salt',
            '5-6 fresh green chilies, slit lengthwise',
            '1/2 tsp wild nigella seeds (kalo jeere)',
            '1/2 tsp turmeric powder',
            'Rock salt to taste'
        ];
        steps = [
            `Coat the Hilsa steaks gently with turmeric and rock salt. Rest for 10 minutes.`,
            `Warm mustard oil in a heavy pan until smoke just begins to dissipate. Add nigella seeds and green chilies.`,
            `Whisk the ${isMustardAllergic ? 'spiced curd' : 'mustard paste'} with a little warm water and slide into the pan on low heat.`,
            `Gently nestle the Hilsa steaks into the simmering gravy. Cover tightly with a lid.`,
            `Cook on medium-low flame for 6 minutes per side. The natural rich oils of the Hilsa will melt into the sauce.`,
            `Turn off heat, drizzle 1 tsp raw mustard oil on top, and keep covered for 5 minutes before serving with hot steamed rice.`
        ];
        otherDishes = [
            { name: 'Ilish Macher Tel Jhol', description: 'Light, comforting digestive broth cooked with nigella seeds and green chilies.' },
            { name: 'Bhapa Ilish in Tiffin Box', description: 'Slow-steamed in a brass container inside a boiling water bath.' },
            { name: 'Ilish Paturi', description: 'Wrapped in smoked banana leaf and roasted on an iron tawa.' },
            { name: 'Ilish Panthas Medley', description: 'Crisp fried Hilsa paired with fermented rice and fried chilies.' }
        ];
        chefTip = `Hilsa is naturally rich in exquisite omega-3 oils. Handle gently and never over-fry, as frying will dry out its delicate fat pockets.`;
    } else {
        // Pomfret, Bhetki, Crab, or general fish
        const dishType = styleLower.includes('steam') ? 'Bhapa' : (styleLower.includes('grill') ? 'Tawa Tandoori' : 'Gourmet Pan-Seared');
        recipeName = `${dishType} ${productName} in Bay Spice Reduction`;
        intro = `Sustainably sourced ${productName} prepared to highlight its delicate, flaky ocean texture with hand-crushed coastal spices and fresh herbs.`;
        prepTime = '12 mins';
        cookTime = '15 mins';
        ingredients = [
            `500g fresh ${productName}, cleaned & scored`,
            `2 tbsp ${cookingOil}`,
            '1 tbsp fresh ginger-garlic reduction paste',
            '1/2 tsp turmeric & 1 tsp Kashmiri paprika',
            '1 tsp roasted cumin and fennel powder',
            'Freshly squeezed lime juice',
            'Slit green chilies & freshly chopped fresh herbs',
            'Sea salt to taste'
        ];
        steps = [
            `Make shallow diagonal incisions along the sides of the ${productName}.`,
            `Rub marinade of lime juice, sea salt, turmeric, and ginger-garlic into the incisions; let rest 15 minutes.`,
            `Heat ${cookingOil} in an iron skillet until smoking point, then lower to medium.`,
            `Sear the fish for 4-5 minutes on the first side without moving it to form a delicate caramelized crust.`,
            `Gently flip and cook for another 3-4 minutes until the flesh flakes cleanly at the bone.`,
            `Baste with fresh pan juices, garnish with fresh herbs and lemon wedges, and serve immediately.`
        ];
        otherDishes = [
            { name: 'Crispy Rava Crusted Fry', description: 'Dredged in spiced semolina and shallow fried to a golden crunch.' },
            { name: 'Coastal Coconut Broth (Meen Moilee)', description: 'Poached in gentle coconut milk with curry leaves and ginger.' },
            { name: 'Banana Leaf Wrapped Paturi', description: 'Infused with roasted spices and slow-cooked in sealed parcels.' },
            { name: 'Smoked Herb Butter Roast', description: 'Finished with charred herbs and wood-smoked aromatics.' }
        ];
        chefTip = `Always bring the fish to room temperature for 10 minutes before cooking. Putting cold fish in hot oil causes water release and prevents a crisp sear.`;
    }

    return {
        featuredRecipe: {
            name: recipeName,
            intro: intro,
            prepTime: prepTime,
            cookTime: cookTime,
            serves: serves,
            ingredients: ingredients,
            steps: steps
        },
        otherDishes: otherDishes,
        chefTip: chefTip
    };
}

export async function POST(req) {
    let payload = {};
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const {
        productName = 'Bengal Tiger Prawns',
        category = 'Seafood',
        description = '',
        allergies = [],
        cuisinePreference = '',
        spiceLevel = 'Medium',
        cookingStyle = ''
    } = payload;

    const apiKey = process.env.GROQ_API_KEY;

    // 1. If Groq API key is present and looks plausible, attempt Groq first
    if (apiKey && apiKey.startsWith('gsk_')) {
        try {
            // Build personalization context
            const personalizations = [];
            if (allergies && allergies.length > 0) {
                personalizations.push(`IMPORTANT - The person has these allergies/dietary restrictions: ${allergies.join(', ')}. Do NOT use any ingredients that contain or are related to these allergens.`);
            }
            if (cuisinePreference) personalizations.push(`Preferred cuisine style: ${cuisinePreference}`);
            if (spiceLevel) personalizations.push(`Preferred spice level: ${spiceLevel}`);
            if (cookingStyle) personalizations.push(`Preferred cooking style: ${cookingStyle}`);
            const personalizationBlock = personalizations.length > 0 ? `\n\nPersonalization preferences:\n${personalizations.join('\n')}` : '';

            const prompt = `You are an expert Indian seafood chef specializing in Bay of Bengal cuisine.

Product: ${productName}
Category: ${category || 'Seafood'}
Description: ${description || ''}${personalizationBlock}

Please provide a personalized recipe taking into account all the preferences above:
1. A featured signature recipe using this product — include dish name, a short intro, prepTime, cookTime, serves, ingredients (as a bulleted array), and clear step-by-step cooking instructions.
2. 4 other quick dish recommendations using this product (just dish name + 1-line description each).
3. One pro chef tip specific to this product.

Format your response as valid JSON matching exactly this structure:
{
  "featuredRecipe": {
    "name": "string",
    "intro": "string",
    "prepTime": "string",
    "cookTime": "string",
    "serves": "string",
    "ingredients": ["string"],
    "steps": ["string"]
  },
  "otherDishes": [
    { "name": "string", "description": "string" }
  ],
  "chefTip": "string"
}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 9000);

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: 1500,
                    response_format: { type: 'json_object' },
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;
                if (content) {
                    const parsed = JSON.parse(content);
                    if (parsed.featuredRecipe && parsed.featuredRecipe.name) {
                        return NextResponse.json(parsed);
                    }
                }
            } else {
                const errText = await response.text();
                console.warn('Groq API call did not succeed, using built-in culinary engine fallback. Response was:', errText);
            }
        } catch (groqErr) {
            console.warn('Groq API call encountered an error or timeout, engaging culinary fallback:', groqErr.message);
        }
    }

    // 2. Intelligent, fail-safe culinary engine fallback
    const fallbackRecipe = generateSmartRecipe({
        productName,
        category,
        description,
        allergies,
        cuisinePreference,
        spiceLevel,
        cookingStyle
    });

    return NextResponse.json(fallbackRecipe);
}
