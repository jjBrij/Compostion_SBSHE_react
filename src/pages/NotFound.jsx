import Button from '../components/Button'
import '../styles/NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-wrap">
      <p className="notfound-code">404</p>
      <h1 className="mt-2 font-display text-2xl font-extrabold uppercase text-slate-900 dark:text-white sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-6">
        <Button to="/">Return Home</Button>
      </div>
    </div>
  )
}