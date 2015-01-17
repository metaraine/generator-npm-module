assert = require('chai').assert
<%=camelize(props.project)%> = require '../index.js'

describe 'something', ->
	it 'should do something', ->
		assert true, false
