import {
  useEffect as useEffectBase,
  useRef as useRefBase,
  useState as useStateBase
} from 'react'

import {
  useLocation as useLocationBase,
  useNavigate as useNavigateBase,
  useParams as useParamsBase,
} from 'react-router-dom'

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from 'react-redux'

import {
  useTranslation as useTranslationBase
} from 'react-i18next'

export const useQuery = () => {
  return new URLSearchParams(useLocationBase().search)
}

export const useEffect = useEffectBase
export const useRef = useRefBase
export const useState = useStateBase

export const useLocation = useLocationBase
export const useNavigate = useNavigateBase
export const useParams = useParamsBase

export const useDispatch = useDispatchBase
export const useSelector = useSelectorBase

export const useTranslation = useTranslationBase
