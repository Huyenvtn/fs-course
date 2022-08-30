const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    const total = 0
    blogs.forEach(element => {
        if (element.likes) {
            total +=element.likes
        }
    })
    return total
  }

  
  module.exports = {
    dummy,
    totalLikes
  }