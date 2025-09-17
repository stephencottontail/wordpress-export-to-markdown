export function author(post) {
	// not decoded (WordPress doesn't allow funky characters in usernames anyway)
	// surprisingly, does not always exist (squarespace exports, for example)
	return post.data.optionalChildValue('creator');
}

export function categories(post) {
	// array of decoded category names, excluding 'uncategorized'
	const categories = post.data.children('category');
	return categories
		.filter((category) => category.attribute('domain') === 'category' && category.attribute('nicename') !== 'uncategorized')
		.map((category) => decodeURIComponent(category.attribute('nicename')));
}

export function coverImage(post) {
	// cover image filename, previously parsed and decoded
	return post.coverImage;
}

export function date(post) {
	// a luxon datetime object, previously parsed
	return post.date;
}

export function draft(post) {
	// boolean representing the previously parsed draft status, only included when true
	return post.isDraft ? true : undefined;
}

export function excerpt(post) {
	// not decoded, newlines collapsed
	// does not always exist (squarespace exports, for example)
	const encoded = post.data.optionalChildValue('encoded', 1);
	return encoded ? encoded.replace(/[\r\n]+/gm, ' ') : undefined;
}

export function id(post) {
	// previously parsed as a string, converted to integer here
	return parseInt(post.id);
}

export function modified(post) {
	// standard Date object
	return post.modified;
}

export function slug(post) {
	// previously parsed and decoded
	return post.slug;
}

export function tags(post) {
	// array of decoded tag names (yes, they come from <category> nodes, not a typo)
	const categories = post.data.children('category');
	return categories
		.filter((category) => category.attribute('domain') === 'post_tag')
		.map((category) => decodeURIComponent(category.attribute('nicename')));
}

export function title(post) {
	// not decoded
	return post.data.childValue('title');
}

export function type(post) {
	// previously parsed but not decoded, can be "post", "page", or other custom types
	return post.type;
}
