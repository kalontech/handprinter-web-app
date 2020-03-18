import { useState, useEffect } from 'react'

import { fetchOwnGroupsList } from '../../api/groups'
import { MEMBER_GROUP_ROLES } from '../../utils/constants'

export default function useOwnGroupsList() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetchOwnGroupsList()
        if (res) {
          const groups = res.groups
          setGroups(
            groups.docs.filter(
              i =>
                i.info.memberRole === MEMBER_GROUP_ROLES.ADMIN ||
                i.info.memberRole === MEMBER_GROUP_ROLES.OWNER,
            ),
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchList()
  }, [groups.length])

  return [groups]
}
