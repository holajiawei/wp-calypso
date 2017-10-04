/**
 * @format
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

/**
 * Internal dependencies
 */
import searchClass from '../';

jest.mock( 'lib/analytics', () => ( {} ) );
jest.mock( 'gridicons', () => require( 'components/empty-component' ) );

describe( 'Search', function() {
	describe( 'initialValue', function() {
		let onSearch, rendered;

		beforeEach( function() {
			onSearch = sinon.stub();
		} );

		describe( 'with initialValue', function() {
			const initialValue = 'hello';

			beforeEach( function() {
				const searchElement = React.createElement( searchClass, {
					initialValue,
					onSearch,
				} );
				rendered = TestUtils.renderIntoDocument( searchElement );
			} );

			it( 'should set state.keyword with the initialValue after mount', function() {
				expect( rendered.state.keyword ).to.equal( initialValue );
			} );
		} );

		describe( 'without initialValue', function() {
			beforeEach( function() {
				const searchElement = React.createElement( searchClass, {
					onSearch,
				} );
				rendered = TestUtils.renderIntoDocument( searchElement );
			} );

			it( 'should set state.keyword empty string after mount', function() {
				expect( rendered.state.keyword ).to.equal( '' );
			} );
		} );
	} );
} );
