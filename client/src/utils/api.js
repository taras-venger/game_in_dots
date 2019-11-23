export const fetchData = async url => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

export const postWinner = async name => {
  const response = await fetch('/winners', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: name, date: Date.now })
  });
  const result = await response.json();
  return result;
};
