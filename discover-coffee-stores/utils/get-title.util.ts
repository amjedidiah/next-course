export default function getTitle(path: string) {
  const editedPath = path.slice(1);
  return editedPath
    ? editedPath.charAt(0).toUpperCase() + editedPath.slice(1)
    : "Home";
};