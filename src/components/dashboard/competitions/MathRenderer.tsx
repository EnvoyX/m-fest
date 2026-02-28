import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathRenderer({ equation }: { equation: string }) {
  // Fungsi buat mecah teks biasa dan rumus di dalem $...$
  const parts = equation.split(/(\$.*?\$)/g);

  return (
    <span className="leading-relaxed break-words whitespace-pre-wrap">
      {parts.map((part, index) => {
        // Kalau bagian ini diawali & diakhiri $, render pake KaTeX
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1); // Ambil isi dalem dolarnya aja
          try {
            const html = katex.renderToString(math, { 
              throwOnError: false,
              displayMode: false 
            });
            return (
              <span 
                key={index} 
                className="inline-block mx-1"
                dangerouslySetInnerHTML={{ __html: html }} 
              />
            );
          } catch (e) {
            return <span key={index} className="text-red-500">{part}</span>;
          }
        }
        // Teks biasa (kayak kalimat Polisi) muncul normal dan bisa pindah baris
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}