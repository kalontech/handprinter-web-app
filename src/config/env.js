let env = {}

if (process && process.env) {
  env = {
    ...env,
    ...process.env,
  }
}

if (window && window.env) {
  env = {
    ...env,
    ...window.env,
  }
}

// Print the env to the developer's console.
console.log("Debug/.env", env)

export default env
