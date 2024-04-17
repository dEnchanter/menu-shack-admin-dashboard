export function getInitials(name) {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0].toUpperCase())
    .join('');
}
