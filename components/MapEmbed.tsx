export default function MapEmbed({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  const delta = 0.006;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="border border-line aspect-[4/3] w-full">
      <iframe
        title={title}
        src={src}
        className="h-full w-full grayscale-[15%] contrast-[1.05]"
        loading="lazy"
      />
    </div>
  );
}
