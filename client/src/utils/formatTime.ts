// import { format, getTime, formatDistanceToNow } from 'date-fns';

// // ----------------------------------------------------------------------

// export function fDate(date) {
//   return format(new Date(date), 'dd MMMM yyyy');
// }

// export function fDateTime(date) {
//   return format(new Date(date), 'dd MMM yyyy HH:mm');
// }

// export function fTimestamp(date) {
//   return getTime(new Date(date));
// }

// export function fDateTimeSuffix(date) {
//   return format(new Date(date), 'dd/MM/yyyy hh:mm p');
// }

// export function fToNow(date) {
//   return formatDistanceToNow(new Date(date), {
//     addSuffix: true,
//   });
// }

export function formatMongoTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const today = new Date();

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `${hours}:${minutes}`;
  } else if (date.getFullYear() === today.getFullYear()) {
    return `${day}/${month}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}
