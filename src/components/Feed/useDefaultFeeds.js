import { useEffect, useState } from 'react'
import { GROUPS_SUBSETS } from 'utils/constants'
import { fetchGroupsList } from 'api/groups'
import _ from 'lodash'

/*
  For every post in activity the post should be copied to default feeds 
   - user dashboard world
   - branded activity
   - user's each group activity
   - personal user feed
*/
export default function useDefaultFeeds(user) {
  const [defaultFeeds, setDefaultFeeds] = useState([])

  useEffect(() => {
    async function buildDefaultFeeds() {
      let feeds = ['timeline:world']
      if (user._id) {
        feeds.push(`timeline:user-${user._id}`)
      }
      if (user.belongsToBrand) {
        feeds.push(`timeline:brand-${user.belongsToBrand}`)
      }
      if (user.belongsToOrganization) {
        feeds.push(`timeline:brand-${user.belongsToOrganization}`)
      }
      try {
        const resMyGroups = await fetchGroupsList({
          subset: GROUPS_SUBSETS.MY,
        })
        const myGroups = _.get(resMyGroups, 'groups.docs', [])

        myGroups.forEach(group => {
          feeds.push(`timeline:group-${group._id}`)
        })
      } catch (error) {
        console.error(error)
      }
      setDefaultFeeds(feeds)
    }
    buildDefaultFeeds()
  }, [user._id])

  return defaultFeeds
}
