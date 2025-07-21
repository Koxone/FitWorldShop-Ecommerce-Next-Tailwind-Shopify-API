/*
 * KoxIcons.jsx
 * ----------------------------------------------
 * Amplio set de íconos reutilizables en el MISMO estilo
 * que los que subiste: trazo "currentColor", strokeWidth=2,
 * extremos/codos redondeados, viewBox 24x24. Todos exponen props
 * consistentes: size, className, strokeWidth (opcional), filled (cuando aplica),
 * title (para accesibilidad). Se exportan individualmente (tree-shake), y también
 * como objeto agrupado `Icons` al final para lookup dinámico.
 *
 * Uso básico:
 *   import { SearchIcon, HomeIcon } from './KoxIcons';
 *   <SearchIcon size={24} className="text-white" />
 *   <StarIcon filled size={16} className="text-yellow-500" />
 *
 * NOTA: No lleva 'use client'; los SVGs son seguros en Server/Client.
 */

import * as React from 'react';

export const IconBase = React.forwardRef(function IconBase(
  {
    size = 20,
    className = '',
    strokeWidth = 2,
    filled = false,
    title,
    children,
    ...rest
  },
  ref
) {
  const ariaProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...ariaProps}
      {...rest}
    >
      {children}
    </svg>
  );
});

/* --------------------------------------------------------------
 * CORE / STATUS
 * -------------------------------------------------------------- */
export const CheckIcon = (props) => (
  <IconBase {...props}>
    <polyline points="4 12 10 18 20 6" />
  </IconBase>
);

export const XIcon = (props) => (
  <IconBase {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconBase>
);

export const CheckIconCart = (props) => (
  <IconBase {...props} filled>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.285 6.709a1 1 0 010 1.414l-9.5 9.5a1 1 0 
      01-1.414 0l-4.5-4.5a1 1 0 011.414-1.414L10 
      15.086l8.871-8.877a1 1 0 011.414 0z"
    />
  </IconBase>
);


export const InfoIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </IconBase>
);

export const AlertTriangleIcon = (props) => (
  <IconBase {...props}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </IconBase>
);

export const AlertCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </IconBase>
);

export const QuestionCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9a3 3 0 0 1 6 0c0 1.5-1 2-2 2s-2 .5-2 2" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </IconBase>
);

/* --------------------------------------------------------------
 * SIZE / QUANTITY
 * -------------------------------------------------------------- */
export const PlusIcon = (props) => (
  <IconBase {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconBase>
);

export const MinusIcon = (props) => (
  <IconBase {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconBase>
);

export const CheckCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 12 15 17 9" />
  </IconBase>
);

export const XCircleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </IconBase>
);

/* --------------------------------------------------------------
 * NAVIGATION / LAYOUT
 * -------------------------------------------------------------- */
export const MenuIcon = (props) => (
  <IconBase {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </IconBase>
);

export const CloseIcon = (props) => <XIcon {...props} />; // alias

export const ChevronLeftIcon = (props) => (
  <IconBase {...props}>
    <polyline points="15 18 9 12 15 6" />
  </IconBase>
);
export const ChevronRightIcon = (props) => (
  <IconBase {...props}>
    <polyline points="9 18 15 12 9 6" />
  </IconBase>
);
export const ChevronUpIcon = (props) => (
  <IconBase {...props}>
    <polyline points="6 15 12 9 18 15" />
  </IconBase>
);
export const ChevronDownIcon = (props) => (
  <IconBase {...props}>
    <polyline points="6 9 12 15 18 9" />
  </IconBase>
);

export const ArrowLeftIcon = (props) => (
  <IconBase {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </IconBase>
);
export const ArrowRightIcon = (props) => (
  <IconBase {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconBase>
);
export const ArrowUpIcon = (props) => (
  <IconBase {...props}>
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </IconBase>
);
export const ArrowDownIcon = (props) => (
  <IconBase {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </IconBase>
);
export const ArrowUpRightIcon = (props) => (
  <IconBase {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </IconBase>
);

export const ExpandIcon = (props) => (
  <IconBase {...props}>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </IconBase>
);
export const CollapseIcon = (props) => (
  <IconBase {...props}>
    <polyline points="9 3 3 3 3 9" />
    <polyline points="15 21 21 21 21 15" />
    <line x1="3" y1="3" x2="10" y2="10" />
    <line x1="21" y1="21" x2="14" y2="14" />
  </IconBase>
);

export const MoreHorizontalIcon = (props) => (
  <IconBase {...props}>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </IconBase>
);
export const MoreVerticalIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </IconBase>
);

export const DragHandleIcon = (props) => (
  <IconBase {...props}>
    <circle cx="8" cy="10" r="1" />
    <circle cx="8" cy="14" r="1" />
    <circle cx="12" cy="10" r="1" />
    <circle cx="12" cy="14" r="1" />
    <circle cx="16" cy="10" r="1" />
    <circle cx="16" cy="14" r="1" />
  </IconBase>
);

export const GridIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </IconBase>
);

export const ListIcon = (props) => (
  <IconBase {...props}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </IconBase>
);

export const SortAscIcon = (props) => (
  <IconBase {...props}>
    <path d="M11 11h8" />
    <path d="M11 7h10" />
    <path d="M11 15h6" />
    <polyline points="4 17 6 19 8 17" />
    <line x1="6" y1="19" x2="6" y2="5" />
  </IconBase>
);
export const SortDescIcon = (props) => (
  <IconBase {...props}>
    <path d="M11 13h8" />
    <path d="M11 17h10" />
    <path d="M11 9h6" />
    <polyline points="4 7 6 5 8 7" />
    <line x1="6" y1="5" x2="6" y2="19" />
  </IconBase>
);

/* --------------------------------------------------------------
 * USER / AUTH
 * -------------------------------------------------------------- */
export const UserIcon = (props) => (
  <IconBase {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconBase>
);

export const UsersIcon = (props) => (
  <IconBase {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </IconBase>
);

export const UserPlusIcon = (props) => (
  <IconBase {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </IconBase>
);
export const UserMinusIcon = (props) => (
  <IconBase {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </IconBase>
);

export const LoginIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </IconBase>
);
export const LogoutIcon = (props) => (
  <IconBase {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="14 17 9 12 14 7" />
    <line x1="9" y1="12" x2="21" y2="12" />
  </IconBase>
);

export const SettingsIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 1-2 0 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 1 0-2 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 1 2 0 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 .6 1 1.65 1.65 0 0 1 0 2 1.65 1.65 0 0 0-.6 1Z" />
  </IconBase>
);

/* --------------------------------------------------------------
 * CONTENT / EDITING
 * -------------------------------------------------------------- */
export const EditIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </IconBase>
);

export const TrashIcon = (props) => (
  <IconBase {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14H5V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </IconBase>
);

export const CopyIcon = (props) => (
  <IconBase {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </IconBase>
);

export const ClipboardIcon = (props) => (
  <IconBase {...props}>
    <rect x="8" y="4" width="8" height="4" rx="1" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M8 8H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2" />
  </IconBase>
);

export const SaveIcon = (props) => (
  <IconBase {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M17 21v-8H7v8" />
    <path d="M7 3v5h8" />
  </IconBase>
);

export const DownloadIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </IconBase>
);
export const UploadIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </IconBase>
);

export const RefreshCwIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 2v6h-6" />
    <path d="M21 8a9 9 0 1 0 3 5" />
  </IconBase>
);
export const RefreshCcwIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 2v6h6" />
    <path d="M3 8a9 9 0 1 1-3 5" />
  </IconBase>
);

export const FilterIcon = (props) => (
  <IconBase {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46" />
  </IconBase>
);

/* --------------------------------------------------------------
 * SEARCH / DATA
 * -------------------------------------------------------------- */
export const SearchIcon = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </IconBase>
);

/* --------------------------------------------------------------
 * VISUAL STATES (FAVORITES, RATINGS, ETC.)
 * -------------------------------------------------------------- */
export const HeartIcon = ({ filled = false, ...props }) => (
  <IconBase filled={filled} {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </IconBase>
);
export const StarIcon = ({ filled = false, ...props }) => (
  <IconBase filled={filled} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  </IconBase>
);
export const BookmarkIcon = ({ filled = false, ...props }) => (
  <IconBase filled={filled} {...props}>
    <path d="M19 21 12 17 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
  </IconBase>
);

/* --------------------------------------------------------------
 * COMMERCE
 * -------------------------------------------------------------- */
export const ShoppingBagIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </IconBase>
);

export const ShoppingCartIcon = (props) => (
  <IconBase {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61H19a2 2 0 0 0 2-1.61L23 6H6" />
  </IconBase>
);

export const TagIcon = (props) => (
  <IconBase {...props}>
    <path d="M20 12V5a2 2 0 0 0-2-2h-7L2 14l8 8 10-10Z" />
    <path d="M7.5 7.5h.01" />
  </IconBase>
);

export const CreditCardIcon = (props) => (
  <IconBase {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </IconBase>
);

/* --------------------------------------------------------------
 * MEDIA
 * -------------------------------------------------------------- */
export const PlayIcon = ({ filled = true, ...props }) => (
  <IconBase filled={filled} {...props}>
    <polygon points="5 3 19 12 5 21" />
  </IconBase>
);
export const PauseIcon = (props) => (
  <IconBase {...props}>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </IconBase>
);
export const StopIcon = (props) => (
  <IconBase {...props}>
    <rect x="6" y="6" width="12" height="12" />
  </IconBase>
);

export const VolumeIcon = (props) => (
  <IconBase {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </IconBase>
);
export const VolumeMuteIcon = (props) => (
  <IconBase {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </IconBase>
);

export const ImageIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5-4 4-2-2-5 5" />
  </IconBase>
);
export const CameraIcon = (props) => (
  <IconBase {...props}>
    <path d="M23 19V7a2 2 0 0 0-2-2h-3l-2-2H8L6 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2Z" />
    <circle cx="12" cy="13" r="4" />
  </IconBase>
);
export const VideoIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="7" width="15" height="10" rx="2" ry="2" />
    <polygon points="21 7 21 17 27 12" transform="translate(-3 0)" />
  </IconBase>
);

/* --------------------------------------------------------------
 * FORM / VISIBILITY
 * -------------------------------------------------------------- */
export const EyeIcon = (props) => (
  <IconBase {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);
export const EyeOffIcon = (props) => (
  <IconBase {...props}>
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94" />
    <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </IconBase>
);

export const CheckSquareIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="9 12 11 14 15 10" />
  </IconBase>
);
export const SquareIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </IconBase>
);
export const RadioIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
  </IconBase>
);
export const RadioSelectedIcon = (props) => (
  <IconBase filled {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" fill="none" />
  </IconBase>
);

/* --------------------------------------------------------------
 * SYSTEM / OBJECT
 * -------------------------------------------------------------- */
export const HomeIcon = (props) => (
  <IconBase {...props}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 11v10h14V11" />
  </IconBase>
);
export const BellIcon = (props) => (
  <IconBase {...props}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </IconBase>
);
export const CalendarIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconBase>
);
export const ClockIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconBase>
);
export const MapPinIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 10c0 5.25-9 13-9 13S3 15.25 3 10a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconBase>
);
export const MailIcon = (props) => (
  <IconBase {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22 4 12 13 2 4" />
  </IconBase>
);
export const PhoneIcon = (props) => (
  <IconBase {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 9.81 19.79 19.79 0 0 1 1.08 1.18 2 2 0 0 1 3.05-.99h3a2 2 0 0 1 2 1.72c.12.81.37 1.6.73 2.34l.4.8a2 2 0 0 1-.45 2.23l-1.27 1.27a16 16 0 0 0 6.86 6.86l1.27-1.27a2 2 0 0 1 2.23-.45l.8.4c.74.36 1.53.61 2.34.73A2 2 0 0 1 22 16.92Z" />
  </IconBase>
);
export const GlobeIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 0 0 20a15.3 15.3 0 0 0 0-20Z" />
  </IconBase>
);

export const LinkIcon = (props) => (
  <IconBase {...props}>
    <path d="M10 13a5 5 0 0 1 0-7l1.17-1.17a5 5 0 0 1 7.07 7.07l-.88.88" />
    <path d="M14 11a5 5 0 0 1 0 7l-1.17 1.17a5 5 0 0 1-7.07-7.07l.88-.88" />
  </IconBase>
);
export const ExternalLinkIcon = (props) => (
  <IconBase {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </IconBase>
);

/* --------------------------------------------------------------
 * SHARE / SOCIAL
 * -------------------------------------------------------------- */
export const ShareIcon = (props) => (
  <IconBase {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </IconBase>
);

/* --------------------------------------------------------------
 * AGGREGATED EXPORT MAP
 * -------------------------------------------------------------- */
export const Icons = {
  // core
  CheckIcon,
  XIcon,
  InfoIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  QuestionCircleIcon,
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  XCircleIcon,
  // navigation
  MenuIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpRightIcon,
  ExpandIcon,
  CollapseIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  DragHandleIcon,
  GridIcon,
  ListIcon,
  SortAscIcon,
  SortDescIcon,
  // user/auth
  UserIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  LoginIcon,
  LogoutIcon,
  SettingsIcon,
  // content/edit
  EditIcon,
  TrashIcon,
  CopyIcon,
  ClipboardIcon,
  SaveIcon,
  DownloadIcon,
  UploadIcon,
  RefreshCwIcon,
  RefreshCcwIcon,
  FilterIcon,
  // search
  SearchIcon,
  // visual states
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  // commerce
  ShoppingBagIcon,
  ShoppingCartIcon,
  TagIcon,
  CreditCardIcon,
  // media
  PlayIcon,
  PauseIcon,
  StopIcon,
  VolumeIcon,
  VolumeMuteIcon,
  ImageIcon,
  CameraIcon,
  VideoIcon,
  // form
  EyeIcon,
  EyeOffIcon,
  CheckSquareIcon,
  SquareIcon,
  RadioIcon,
  RadioSelectedIcon,
  // system
  HomeIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  LinkIcon,
  ExternalLinkIcon,
  // share
  ShareIcon,
};

export default Icons;
