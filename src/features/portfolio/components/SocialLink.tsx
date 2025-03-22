import { ArrowUpRight } from "lucide-react";

const SocialLink = ({ url, name }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 flex items-center header-github-link"
    >
      {name}
      <ArrowUpRight size="16px" />
    </a>
  );
};

export default SocialLink;
