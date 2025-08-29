const INT_RE = /^-?\d+$/;
const ALPHA_RE = /^[A-Za-z]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      is_success: false,
      user_id: "priyadharshini_09072005",   
      email: "itspriyadhrsh@gmail.com",       
      roll_number: "22bmh1039",         
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Only POST is allowed"
    });
  }

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    const data = (body && Array.isArray(body.data)) ? body.data : null;
    if (!data) {
      return res.status(200).json({
        is_success: false,
        user_id: "priyadharshini_09072005",
        email: "itspriyadhrsh@gmail.com",
        roll_number: "22bmh1039",
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Request JSON must have array field: data"
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let total = 0;

    for (const raw of data) {
      const item = String(raw);
      if (INT_RE.test(item)) {
        const n = parseInt(item, 10);
        if (Math.abs(n) % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        total += n;
      } else if (ALPHA_RE.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    }

    const lettersJoined = data
      .map(String)
      .filter((s) => ALPHA_RE.test(s))
      .join("");
    const reversedChars = lettersJoined.split("").reverse();
    const concat_string = reversedChars
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: "priyadharshini_09072005",   // 👈 update here too
      email: "itspriyadhrsh@gmail.com",
      roll_number: "22bmh1039",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(total),
      concat_string
    });
  } catch {
    return res.status(200).json({
      is_success: false,
      user_id: "priyadharshini_09072005",
      email: "itspriyadhrsh@gmail.com",
      roll_number: "22bmh1039",
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Invalid JSON payload"
    });
  }
}
 
