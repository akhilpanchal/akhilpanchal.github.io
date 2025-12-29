interface Props {
  id: string;
  title?: string;
}

export default function YouTube({ id, title = 'YouTube video' }: Props) {
  return (
    <div className="relative w-full my-6" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
