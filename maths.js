const getDistance = (r) => {
	// x = (0.055 y-1)^(3)+1
	// (a-b)³ - c
	r = -r
	const a = 0.055
	const b = 1
	const c = -1
  //const base = -1 * (20 + Math.cbrt(6000 * m))
	// (a-b)³ = a³ - 3a²b + 3ab² - b³
	const base = (s) => ((s*a)**3 - ((3*(s*a)**2)*b) + (3*(s*a)*(b**2)) - b**3) - c
	return [...Array(4).keys()].map(n => ({"nWalls": n, "meters": base(r - n*5)}))
}

export { getDistance }

