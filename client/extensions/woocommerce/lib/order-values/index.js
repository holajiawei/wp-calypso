/** @format */
/**
 * External dependencies
 */
import { get, reduce } from 'lodash';

/**
 * Get the total tax for the discount value
 *
 * @param {Object} order An order as returned from API
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderDiscountTax( order ) {
	const coupons = get( order, 'coupon_lines', [] );
	const tax = reduce( coupons, ( sum, value ) => sum + parseFloat( value.discount_tax ), 0 );
	return parseFloat( tax ) || 0;
}

/**
 * Get the total tax for a given line item's value
 *
 * @param {Object} order An order as returned from API
 * @param {Number} index The index of a line item in this order
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderLineItemTax( order, index ) {
	const tax = get( order, `line_items[${ index }].taxes[0].total`, 0 );
	return parseFloat( tax ) || 0;
}

/**
 * Get the total tax for a given line item's value
 *
 * @param {Object} order An order as returned from API
 * @param {Number} index The index of a fee line in this order
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderFeeTax( order, index ) {
	const tax = get( order, `fee_lines[${ index }].taxes[0].total`, 0 );
	return parseFloat( tax ) || 0;
}

/**
 * Get the total tax for all fees in an order (total of all fee lines)
 *
 * @param {Object} order An order as returned from API
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderFeeTotalTax( order ) {
	const lines = get( order, 'fee_lines', [] );
	return reduce( lines, ( sum, value, key ) => sum + getOrderFeeTax( order, key ), 0 );
}

/**
 * Get the total tax for the shipping value
 *
 * @param {Object} order An order as returned from API
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderShippingTax( order ) {
	const tax = get( order, 'shipping_lines[0].taxes[0].total', 0 );
	return parseFloat( tax ) || 0;
}

/**
 * Get the total tax for the subtotal value (total of all line items)
 *
 * @param {Object} order An order as returned from API
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderSubtotalTax( order ) {
	const items = get( order, 'line_items', [] );
	return reduce( items, ( sum, value, key ) => sum + getOrderLineItemTax( order, key ), 0 );
}

/**
 * Get the total tax for the total value
 *
 * @param {Object} order An order as returned from API
 * @return {Float} Tax amount as a decimal number
 */
export function getOrderTotalTax( order ) {
	const subtotal = getOrderSubtotalTax( order );
	const shipping = getOrderShippingTax( order );
	const fees = getOrderFeeTotalTax( order );
	return subtotal + shipping + fees;
}

/**
 * Get the fee total on a given order
 *
 * @param {Object} order An order as returned from API
 * @return {Float} The total fee amount as a decimal number
 */
export function getOrderFeeTotal( order ) {
	const fees = get( order, 'fee_lines', [] );
	return reduce( fees, ( sum, value ) => sum + parseFloat( value.total ), 0 );
}

/**
 * Get the refund value on a given order
 *
 * @param {Object} order An order as returned from API
 * @return {Float} The refund amount as a decimal number
 */
export function getOrderRefundTotal( order ) {
	const refunds = get( order, 'refunds', [] );
	return reduce( refunds, ( sum, value ) => sum + parseFloat( value.total ), 0 );
}