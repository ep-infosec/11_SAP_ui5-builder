import nonAsciiEscaper from "../processors/nonAsciiEscaper.js";

/**
 * @public
 * @module @ui5/builder/tasks/escapeNonAsciiCharacters
 */

/**
 * Task to escape non ascii characters in properties files resources.
 *
 * @public
 * @function default
 * @static
 *
 * @param {object} parameters Parameters
 * @param {@ui5/fs/DuplexCollection} parameters.workspace DuplexCollection to read and write files
 * @param {object} parameters.options Options
 * @param {string} parameters.options.pattern Glob pattern to locate the files to be processed
 * @param {string} parameters.options.encoding source file encoding either "UTF-8" or "ISO-8859-1"
 * @returns {Promise<undefined>} Promise resolving with <code>undefined</code> once data has been written
 */
export default async function({workspace, options: {pattern, encoding}}) {
	if (!encoding) {
		throw new Error("[escapeNonAsciiCharacters] Mandatory option 'encoding' not provided");
	}

	const allResources = await workspace.byGlob(pattern);

	const processedResources = await nonAsciiEscaper({
		resources: allResources,
		options: {
			encoding: nonAsciiEscaper.getEncodingFromAlias(encoding)
		}
	});

	await Promise.all(processedResources.map((resource) => workspace.write(resource)));
}
