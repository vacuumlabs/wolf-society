import { NFTDetailProps } from './NFTDetail'

const d = new Date()
d.setHours(d.getHours() + 2)

const desc =
  'Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et massa at neque vulputate tempus. Ut ac justo erat. Aliquam et ante massa. Ut consequat, ante non consequat.\n\n\nDescription lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et massa at neque vulputate tempus. Ut ac justo erat. Aliquam et ante massa.  quat, ante non consequat. Description lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et massa at neque vulputate tempus.'

export const MOCKED_NFT_DETAIL: Omit<NFTDetailProps, 'isOpen' | 'onClose'> = {
  nftDescriptionProps: {
    name: 'NFT 500',
    totalPieces: 1000,
    soldPieces: 100,
    deadline: d,
    descriptionText: desc,
    imageUrl: 'https://picsum.photos/id/986/1000/1000',
  },
  nftArtistProps: {
    name: 'artist name',
    imageUrl: 'https://picsum.photos/id/986/1000/1000',
    socialLinks: {
      igUrl: 'https://www.instagram.com/',
      twitterURL: 'https://www.twitter.com/',
      webUrl: 'https://www.google.com/',
    },
    descriptionLeft: desc,
    descriptionRight: desc,
  },
  nftUsageProps: {
    lists: [
      {
        caption: 'Beat the Drum',
        description: 'what can you do with this NFT ',
        texts: [
          'Get 500 in-game tokens used in Wolf Society Edu Game (use the game tokens for buying digital land and otherin-game assets)',
          'Get 1,5x multiplier of points earned within the Wolf Society Edu Game',
          'Get permanent 30% discount on all items in the Wolf Society in-game marketplaceand e-shop',
          'Get VIP access to the Wolf Society Discord for early supporters',
        ],
      },
      {
        caption: 'Bread&Butter',
        description: 'what can you do with this NFT ',
        texts: [
          'Earn ETH rewards from all NFTs sold in the future on Wolfsociety.org',
          'Get extra 500 in-game tokens',
          'Whitelist for future airdrop of Wolf Society fungible token',
          'Grant access to exclusive items, services, events',
        ],
      },
    ],
  },
  nftBuyProps: {
    priceETH: 0.7,
  },
}
