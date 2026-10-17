// # IMPORTS
export function User(name, address, age, role) {
  const id = crypto.randomUUID();

  // # READ
  const getId = () => id;
  const getName = () => name;
  const getAge = () => age;
  const getAddress = () => address;

  // # MUTATE
  const setRole = (newRole) => {
    role = newRole;
  };

  return {
    getId,
    getName,
    getAddress,
    getAge,
    setRole,
  };
}
