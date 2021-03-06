"use strict";

const should = require('chai').should();
const expect = require('chai').expect;
const image = require("../lib/image.js")
const path = require("path")

describe('Image', () => {
  describe('.imageExtensions', () => {
    it('should be jpg and png', () => {
      image.imageExtensions.length.should.equal(2)
      image.imageExtensions.should.contain("jpg")
      image.imageExtensions.should.contain("png")
    })
  })

  describe('.inbox', () => {
    it('should return nothing when passed no files', () => {
      const result = image.inbox([])
      result.length.should.equal(0)
      result.should.be.empty
    })

    it('should contain extension and name separately', () => {
      const result = image.inbox(["foo.jpg"])[0]
      result.name.should.equal("foo")
      result.extension.should.equal("jpg")
    })

    it('should filter out non-image files', () => {
      const files = ["foo.bar", "extensionless", "pure.gold"]
      const result = image.inbox(files)
      result.length.should.equal(0)
    })
  })

  describe('.orientation', async () => { 
    it('return landscape when height < width', async () => {
      const landscape_image = path.join(__dirname, "resources", "img", "landscape.png")
      console.log(`landscape image: ${landscape_image}`)
      const image_name = { source: landscape_image }
      const result = await image.orientation(image_name)
      result.should.equal("landscape")
    })     

    it('return portrait when height > width', async () => {
      const portrait_image = path.join(__dirname, "resources", "img", "portrait.png")
      console.log(`portrait image: ${portrait_image}`)
      const image_name = { source: portrait_image }
      const result = await image.orientation(image_name)
      result.should.equal("portrait")
    })  
  })
})