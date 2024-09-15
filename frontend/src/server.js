export const postNewToDo = async (newToDo, user) => {
  newToDo.user_id = user.id;
  await fetch("http://localhost:8000/api/create_todo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToDo),
  }).then((res) => {
    console.log(res);
  });
  return await getUserDataAPI(user);
};
export const getUserDataAPI = async (user) => {
  const fetchResult = await fetch("http://localhost:8000/api/user_todo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => data);
  if (fetchResult.length === 0) {
    return [];
  } else {
    return [...fetchResult];
  }
};
export const loginUser = async (email, password) => {
  return fetch("http://localhost:8000/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};
export const registrateUser = async (name, email, password) => {
  fetch("http://localhost:8000/api/reg", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};
export const updateTask = (id, text) => {
  fetch("http://localhost:8000/api/todo", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, text }),
  }).then((res) => console.log(res));
};
export const deleteTask = async (id, user) => {
  await fetch(`http://localhost:8000/api/todo/${id}`, {
    method: "delete",
  });
  return await getUserDataAPI(user);
};
export const logOut = async () => {
  fetch("http://localhost:8000/api/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
