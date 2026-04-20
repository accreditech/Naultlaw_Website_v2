type Props = {
  data: Record<string, unknown>;
};

export function StructuredDataScript({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
