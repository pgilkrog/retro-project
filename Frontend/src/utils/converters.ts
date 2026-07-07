export const convertNameToKebabCase = (name: string): string => {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add a hyphen between lowercase and uppercase letters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase() // Convert to lowercase
}