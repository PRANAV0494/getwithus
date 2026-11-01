/**
 * The layout grid drawn behind every marketing page: 4 columns on phones, 12
 * from 768 px, aligned to the 1200 px container. Fixed and static, so it costs
 * nothing while scrolling; sections with their own background cover it.
 */
export default function GridBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="mx-auto grid h-full max-w-[1200px] grid-cols-4 border-x border-line px-6 md:grid-cols-12 md:px-10">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className="border-r border-line last:border-r-0 max-md:[&:nth-child(n+5)]:hidden"
          />
        ))}
      </div>
    </div>
  );
}
