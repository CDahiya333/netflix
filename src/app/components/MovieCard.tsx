import Image from "next/image";

type MovieCardProps = {
  title: string;
  src: string;
  width?: string;
  height?: string;
};

export default function MovieCard({
  title,
  src,
  width = "100%", 
  height = "163px",
}: MovieCardProps) {
  return (
    <div
      className="rounded overflow-hidden shadow-lg bg-zinc-900 hover:scale-105 transition-transform duration-300 cursor-pointer"
      style={{ width, height }}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
          style={{ objectPosition: "top" }}
        />
      </div>
    </div>
  );
}
