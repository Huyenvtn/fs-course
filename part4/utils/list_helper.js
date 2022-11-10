const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  let total = 0
  blogs.forEach(element => {
    if (element.likes) {
      total += element.likes
    }
  })
  return total
}

const favoriteBlog = blogs => {
  let favIndex = 0
  if (blogs && blogs.length > 0) {
    let likes = blogs[0].likes
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > likes) {
        likes = blogs[i].likes
        favIndex = i
      }
    }
    const obj = {
      title: blogs[favIndex].title,
      author: blogs[favIndex].author,
      likes: blogs[favIndex].likes
    }
    return obj
  }
  return {}
}

const mostBlogs = blogs => {
  if (blogs && blogs.length > 0) {
    let arr = []
    let mostObj = {
      author: blogs[0].author,
      blogs: 1
    }
    arr.push(mostObj)

    for (let i = 1; i < blogs.length; i++) {
      const idx = arr.findIndex(el => el.author === blogs[i].author)
      if (idx >= 0) {
        arr[idx].blogs = arr[idx].blogs + 1
        if (arr[idx].blogs > mostObj.blogs) {
          mostObj = arr[idx]
        }
      } else {
        var newObj = { author: blogs[i].author, blogs: 1 }
        arr.push(newObj)
      }
    }

    return mostObj
  }
  return {}
}

const mostLikes = blogs => {
  if (blogs && blogs.length > 0) {
    let arr = []
    let mostObj = {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
    arr.push(mostObj)

    for (let i = 1; i < blogs.length; i++) {
      const idx = arr.findIndex(el => el.author === blogs[i].author)
      if (idx >= 0) {
        arr[idx].likes = arr[idx].likes + blogs[i].likes
        if (arr[idx].likes > mostObj.likes) {
          mostObj = arr[idx]
        }
      } else {
        var newObj = { author: blogs[i].author, likes: blogs[i].likes }
        arr.push(newObj)
      }
    }

    return mostObj
  }
  return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
