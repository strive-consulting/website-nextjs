import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for GeneralSection.
 */
export type GeneralSectionProps = SliceComponentProps<Content.GeneralSectionSlice>

/**
 * Component for "GeneralSection" Slices.
 */
const GeneralSection = ({ slice }: GeneralSectionProps): JSX.Element => {
  // Determine the appropriate Tailwind class based on the text alignment
  const textAlignmentClass = (() => {
    switch (slice.primary.text_alignment) {
      case 'Left':
        return 'text-left';
      case 'Right':
        return 'text-right';
      case 'Center':
        return 'text-center';
      default:
        return ''; // Default alignment if no match
    }
  })();

  return (
    <section
      className="relative"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`pt-5 pb-5 ${textAlignmentClass}`}>
          <PrismicRichText
            field={slice.primary.display_text}
            components={{
              paragraph: ({ children }) => (
                <p className="my-6 text-lg text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline">
                  {children}
                </p>
              ),
              image: ({ node }) => {
                // Check if node.linkTo is of type FilledLinkToWebField or FilledLinkToMediaField
                const linkTo = node.linkTo;
                
                // Type guard for FilledLinkToWebField or FilledLinkToMediaField
                if (linkTo && 'url' in linkTo) {
                  const target = 'target' in linkTo ? linkTo.target : '_self'; // Default to '_self' if no target
                  
                  return (
                    <a
                      href={linkTo.url}
                      target={target}
                      rel="noopener noreferrer"
                      className="block my-4"
                    >
                      <img
                        src={node.url}
                        alt={node.alt || ''}
                        className="inline-block mx-auto"
                      />
                    </a>
                  );
                } else {
                  // If there is no link, just render the image normally
                  return (
                    <img
                      src={node.url}
                      alt={node.alt || ''}
                      className="inline-block mx-auto my-4"
                    />
                  );
                }
              },
              heading2: ({ children }) => <h2 className="h2 my-6">{children}</h2>,
              heading3: ({ children }) => <h3 className="h3 my-6">{children}</h3>,
              heading4: ({ children }) => <h4 className="h4 my-6">{children}</h4>,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default GeneralSection;
