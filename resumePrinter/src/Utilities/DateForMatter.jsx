const CurrendDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // January is 0, so we add 1 to get the actual month
  const day = currentDate.getDate();

  return `${day}-${month}-${year}`;
};
export { CurrendDate };
