export default function transform(data, transformer) {
  return transformer.callback(data);
}
