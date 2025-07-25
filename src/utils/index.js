const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const formatJoinedDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export { showFormattedDate, formatJoinedDate };
