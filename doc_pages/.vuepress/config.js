module.exports = {
  title: 'DicJS',
  base: '/dic-js/',
  themeConfig: {
    search: true,
    docsDir: 'docs',
    lastUpdated: true,
    logo: 'img/logo.png',
    searchMaxSuggestions: 10,
    repo: 'heywhy/dic-js',
    nav: [
      // { text: 'Blogs', link: '/blogs/' },
      // {
      //   type: 'links', text: 'Projects', items: [
      //     {
      //       type: 'repo',
      //       text: 'BucketJs',
      //       link: 'https://github.com/heywhy/bucketjs'
      //     }
      //   ]
      // }
    ]
  },
  chainWebpack(chain, isServer) {
    // console.log(chain)
  },
  markdown: {
    lineNumbers: true,
    config(markdown) {
      // console.log(markdown)
    }
  }
}
