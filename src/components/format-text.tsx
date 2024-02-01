export default function FormatText({ text }: { text: string }) {
  const rows = text.split('\n')

  return rows.map((row, index) => (
    <p key={index} className="indent-4 mb-4">
      {row}
    </p>
  ))
}
