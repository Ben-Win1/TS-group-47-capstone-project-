import { Link } from "react-router";
import Brand from "../components/Brand";
import { Button } from "../components/ui";

export default function NotFoundPage() {
  return <div className="grid min-h-screen place-items-center bg-canvas p-5 text-center"><div><Brand /><p className="mt-12 font-mono text-sm text-brand-600">404_NOT_FOUND</p><h1 className="mt-3 text-4xl font-bold">This endpoint doesn’t exist.</h1><p className="mx-auto mt-4 max-w-md text-muted">The page may have moved, or the URL may be incorrect.</p><Link to="/"><Button className="mt-7">Return home</Button></Link></div></div>;
}
