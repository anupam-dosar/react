export default function Loading({ children = "loading..." }) {
  return <p className="loader">{children}</p>;
}
