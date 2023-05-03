import { tooltipCustomMarkdownRegex } from '@/consts'
import { Typography, TypographyProps } from '@mui/material'
import Link from './Link'
import React from 'react'
import Tooltip from './Tooltip'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { visit } from 'unist-util-visit' // dep of react-markdown

/**
 * `react-markdown` trims whitespace on the node by default,
 *  this remark plugin adds spaces back where necessary.
 *
 * @param toFront Add space to front?
 * @param toBack  Add space to back?
 * @returns a remark parser plugin
 */
const genMarkdownParser = (toFront: boolean, toBack: boolean) => {
  return () => {
    return (tree: any) => {
      visit(tree, 'text', (node) => {
        node.value = `${toFront ? ' ' : ''}${node.value}${toBack ? ' ' : ''}`
      })
    }
  }
}

/**
 *
 * @param {string} text Text formatted in custom markdown with tooltips
 * @param {React.Key} key The key to be prefixed to each of the `<span>` elements composing the resulting `<Typography>` element
 * @returns {string | React.ReactElement<any, any>} A `<span>` element containing the formatted text with tooltips, the text otherwise
 */
const parseText = (
  text: string,
  key: React.Key
): React.ReactElement<any, any> | string => {
  const foundTooltipArray = text.match(tooltipCustomMarkdownRegex)
  if (foundTooltipArray == null) {
    return (
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <span {...props} />,
          a: ({ node, ...props }) => (
            <Link {...props} href={props.href} target={'_blank'} />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    )
  }

  // Splitting by regex splices the capture groups into the resulting array,
  // so we have to split the string manually.
  const { res } = foundTooltipArray.reduce(
    (acc, curr, idx) => {
      const [before, ...after] = acc.text.split(curr)

      const splitChunks =
        idx < foundTooltipArray.length - 1 || after.length == 0
          ? [...acc.res, before]
          : [...acc.res, before, ...after] // add rest on final pass.

      return {
        res: splitChunks,
        text: after.join(curr),
      }
    },
    {
      res: [] as string[],
      text: text,
    }
  )

  const splitTooltips = foundTooltipArray.map((md) => {
    // This is enabled by the behaviour of string split mentioned above
    // The individual capture groups are spliced onto the split array
    // which includes the empty string, the whole string and
    // the two capture groups we need
    const [_emptyBefore, _uninterestingAfter, content, tooltip] = md.split(
      tooltipCustomMarkdownRegex
    )

    return { content, tooltip }
  })

  const normalTexts = res.map((content, idx) => (
    <ReactMarkdown
      remarkPlugins={[
        genMarkdownParser(content.startsWith(' '), content.endsWith(' ')),
      ]}
      key={`${key}-plain-${idx}`}
      components={{
        p: ({ node, ...props }) => <span {...props} />,
        a: ({ node, ...props }) => (
          <Link {...props} href={props.href} target={'_blank'} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  ))

  const tooltippedTexts = splitTooltips.map(({ content, tooltip }, idx) => (
    <Tooltip
      title={
        <ReactMarkdown
          components={{
            p: ({ node, ...props }) => <span {...props} />,
            a: ({ node, ...props }) => (
              <Link {...props} href={props.href} target={'_blank'} />
            ),
          }}
        >
          {tooltip}
        </ReactMarkdown>
      }
      key={`${key}-tooltip-${idx}`}
    >
      <ReactMarkdown
        remarkPlugins={[
          genMarkdownParser(content.startsWith(' '), content.endsWith(' ')),
        ]}
        components={{
          p: ({ node, ...props }) => <span {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </Tooltip>
  ))

  let joined: JSX.Element[] = []
  for (
    let i = 0, j = 0;
    i < normalTexts.length || j < tooltippedTexts.length;
    i++, j++
  ) {
    if (i < normalTexts.length) {
      joined.push(normalTexts[i])
    }
    if (j < tooltippedTexts.length) {
      joined.push(tooltippedTexts[j])
    }
  }

  return <span>{joined}</span>
}

type TypographyWithTooltipsProps = {
  text: string
  key: React.Key
} & TypographyProps

/**
 * A wrapper over the Typography component that inserts tooltips present in the markdown.
 *
 * @param {string} text the text from contentful, including the custom markdown for tooltips
 * @returns A Typography Component containing tooltipped text where necessary.
 */
const TypographyWithTooltips = ({
  text,
  ...props
}: TypographyWithTooltipsProps) => {
  const Content = parseText(text, props.key)
  return <Typography {...props}>{Content}</Typography>
}

export default TypographyWithTooltips
