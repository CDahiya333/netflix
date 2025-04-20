import Image from "next/image";

type MovieCardProps = {
  title: string;
  src: string;
};

export default function MovieCard({
  title,
  src,
}: MovieCardProps) {
  return (
    <div
      className="rounded overflow-hidden shadow-lg bg-zinc-900 hover:scale-105 transition-transform duration-300 cursor-pointer"
      style={{ width: "289.82px", height: "163.18px" }}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={title}
          fill
          sizes="289.82px"
          className="object-cover"
          style={{ objectPosition: "top" }}
        />
      </div>
    </div>
  );
}
