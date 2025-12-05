export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch("https://erp.biotecherp.work/api/hrm/birthday", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer admin',
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching birthday data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
