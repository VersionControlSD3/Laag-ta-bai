// React/TypeScript renditions of the Laag ta bAI design system components.
// Class names and markup mirror the design system bundle so components.css styles them as-is.
import type { CSSProperties, ReactNode } from 'react'
import { ICONS, type IconName } from './icons'
import logo from '../assets/logo-icon.png'

export type { IconName }

function cx(...names: Array<string | false | null | undefined>) {
  return names.filter(Boolean).join(' ')
}

interface IconProps {
  name: IconName
  size?: number
  color?: string
  label?: string
  className?: string
  style?: CSSProperties
}

/** Ionicons drawn inline so they take the CSS colour. */
export function Icon({ name, size = 24, color, label, className, style }: IconProps) {
  return (
    <span
      className={cx('lt-icon', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      style={{ width: size, height: size, color, ...style }}
      dangerouslySetInnerHTML={{
        __html: `<svg viewBox="0 0 512 512" width="${size}" height="${size}" fill="currentColor">${ICONS[name]}</svg>`,
      }}
    />
  )
}

/** The ground every screen sits on: ivory to ivory-deep, top to bottom. */
export function GradientBackground({ children, className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={cx('lt-gradient', 'lt-gradient-plain', className)} style={style}>
      {children}
    </div>
  )
}

interface IconButtonProps {
  icon: IconName
  label: string
  variant?: 'soft' | 'terracotta' | 'navy' | 'surface' | 'ring' | 'camera' | 'scrim' | 'social'
  shape?: 'round' | 'square'
  size?: number
  iconSize?: number
  active?: boolean
  className?: string
  onClick?: () => void
}

/** A single Ionicon in a 40 or 48px disc or rounded square. */
export function IconButton({ icon, label, variant = 'soft', shape = 'round', size = 48, iconSize, active, className, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cx('lt-iconbtn', `lt-iconbtn-${variant}`, shape === 'square' ? 'lt-iconbtn-square' : 'lt-iconbtn-round', active && 'lt-iconbtn-active', className)}
      style={{ width: size, height: size }}
      aria-label={label}
      aria-pressed={active === undefined ? undefined : active}
      onClick={onClick}
    >
      <Icon name={icon} size={iconSize ?? (size <= 40 ? 20 : 22)} />
    </button>
  )
}

interface SearchBarProps {
  id?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  trailingIcon?: IconName
  trailingLabel?: string
  onTrailing?: () => void
}

/** A surface search field with a terracotta search icon. */
export function SearchBar({ id, placeholder = 'Search landmarks, museums...', value, onChange, trailingIcon, trailingLabel = 'Filters', onTrailing }: SearchBarProps) {
  return (
    <label className="lt-search">
      <Icon name="search" size={20} className="lt-search-icon" />
      <input
        id={id}
        type="search"
        placeholder={placeholder}
        className="lt-search-input"
        aria-label={placeholder}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
      />
      {trailingIcon && (
        <button type="button" className="lt-search-trailing" aria-label={trailingLabel} onClick={onTrailing}>
          <Icon name={trailingIcon} size={20} />
        </button>
      )}
    </label>
  )
}

interface TagProps {
  tone?: 'heritage' | 'navy' | 'rating' | 'solid' | 'success' | 'locked'
  icon?: IconName
  children?: ReactNode
}

/** Small labels on cards: heritage tag, fares and XP, a star rating chip, status pills. */
export function Tag({ tone = 'heritage', icon, children }: TagProps) {
  return (
    <span className={cx('lt-tag', `lt-tag-${tone}`)}>
      {icon && <Icon name={icon} size={tone === 'solid' ? 14 : 10} />}
      <span>{children}</span>
    </span>
  )
}

function Rating({ value }: { value: ReactNode }) {
  return (
    <span className="lt-rating">
      <Icon name="star" size={10} className="lt-star" />
      <span>{value}</span>
    </span>
  )
}

interface LandmarkCardProps {
  title: string
  meta?: string
  rating?: number | string
  image?: string
  favorite?: boolean
  onClick?: () => void
}

/** A 160px-wide landmark tile for horizontal rails. */
export function LandmarkCard({ title, meta, rating, image, favorite, onClick }: LandmarkCardProps) {
  return (
    <button type="button" className="lt-tile" onClick={onClick}>
      <span className="lt-tile-media">
        <img src={image ?? logo} alt="" className={image ? 'lt-cover' : 'lt-contain'} />
        {favorite && (
          <span className="lt-tile-fav">
            <Icon name="heart" size={14} />
          </span>
        )}
      </span>
      <span className="lt-tile-title">{title}</span>
      <span className="lt-tile-meta">
        <span className="lt-tile-sub">{meta}</span>
        {rating != null && <Rating value={rating} />}
      </span>
    </button>
  )
}

interface LandmarkRowProps {
  title: string
  subtitle?: string
  rating?: number | string
  tag?: string
  image?: string
  onClick?: () => void
}

/** A full-width landmark row: thumbnail, title, place line and a heritage tag. */
export function LandmarkRow({ title, subtitle, rating, tag, image, onClick }: LandmarkRowProps) {
  return (
    <button type="button" className="lt-row" onClick={onClick}>
      <span className="lt-row-media">
        <img src={image ?? logo} alt="" className={image ? 'lt-cover' : 'lt-contain'} />
      </span>
      <span className="lt-row-body">
        <span className="lt-row-head">
          <span className="lt-row-title">{title}</span>
          {rating != null && (
            <Tag tone="rating" icon="star">
              {rating}
            </Tag>
          )}
        </span>
        <span className="lt-row-sub">{subtitle}</span>
        {tag && (
          <span className="lt-row-foot">
            <Tag tone="heritage">{tag}</Tag>
          </span>
        )}
      </span>
    </button>
  )
}

export type TabName = 'Explore' | 'Archives' | 'Scan' | 'Mastery' | 'Profile'

const TABS: Array<{ name: TabName; icon: 'map' | 'book' | 'camera' | 'trophy' | 'person' }> = [
  { name: 'Explore', icon: 'map' },
  { name: 'Archives', icon: 'book' },
  { name: 'Scan', icon: 'camera' },
  { name: 'Mastery', icon: 'trophy' },
  { name: 'Profile', icon: 'person' },
]

/** The bottom tab bar: four tabs and a raised navy Scan button in the middle. */
export function ScreenNavbar({ active, onSelect }: { active: TabName; onSelect: (name: TabName) => void }) {
  return (
    <nav className="lt-tabbar" aria-label="Main">
      {TABS.map((t) => {
        const on = active === t.name
        if (t.name === 'Scan') {
          return (
            <button key={t.name} type="button" className={cx('lt-tab', 'lt-tab-scan', on && 'lt-tab-on')} aria-current={on ? 'page' : undefined} aria-label="Scan" onClick={() => onSelect(t.name)}>
              <span className="lt-scanbtn">
                <Icon name="camera-outline" size={30} />
              </span>
              <span className="lt-tab-label">Scan</span>
            </button>
          )
        }
        return (
          <button key={t.name} type="button" className={cx('lt-tab', on && 'lt-tab-on')} aria-current={on ? 'page' : undefined} aria-label={t.name} onClick={() => onSelect(t.name)}>
            <Icon name={on ? t.icon : `${t.icon}-outline`} size={24} className="lt-tab-icon" />
            <span className="lt-tab-label">{t.name}</span>
          </button>
        )
      })}
    </nav>
  )
}
