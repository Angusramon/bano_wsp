let state = {
  status: "free",
  occupiedBy: null
};

export default function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const pathname = url.pathname;
  const user = url.searchParams.get("user");

  if (pathname === "/api/state") {
    return res.status(200).json(state);
  }

  if (pathname === "/api/occupy") {
    if (state.status === "free" && user) {
      state = { status: "occupied", occupiedBy: user };
    }
    return res.status(200).json(state);
  }

  if (pathname === "/api/free") {
    state = { status: "free", occupiedBy: null };
    return res.status(200).json(state);
  }

  res.status(404).json({ error: "Not found" });
}