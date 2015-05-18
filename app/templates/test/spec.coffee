assert = require('chai').assert
<%=camelize(props.project)%> = require '../lib'

describe 'something', ->
	it 'should do something', ->
		assert.equal true, false
    assert.deepEqual {}, {}
