export default async function handler(req: any, res: { json: (arg0: { success: boolean; }) => void; }) {
  // Perform data mutation logic
  res.json({ success: true });
}
