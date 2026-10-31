import { useQuery } from '@tanstack/react-query'
import { getContent } from '../api/content.api'
import type { IContent } from '../@types/content.types'

// One shared query for the site content block. react-query dedupes it, so
// the hero, footer and both static pages hit the endpoint once between them.
export const useContent = () => {
  const { data, isLoading } = useQuery({
    queryFn: getContent,
    queryKey: ['get_site_content'],
    staleTime: 5 * 60 * 1000
  })

  return { content: data?.data as IContent | undefined, isLoading }
}
