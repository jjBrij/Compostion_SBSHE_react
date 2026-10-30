import { Link } from 'react-router-dom'

/**
 * Reusable Button.
 * - If `to` is passed → renders a React Router <Link>.
 * - If `href` is passed → renders an <a>.
 * - Otherwise → renders a <button>.
 */
export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className = '',
  ...rest
}) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const classes = `${base} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}