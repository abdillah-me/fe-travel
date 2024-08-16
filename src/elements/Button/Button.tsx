"use client";

import Link from "next/link";
import React from "react";

interface PropsButton {
  type: "button" | "link" | "reset" | undefined;
  onClick?: () => void;
  target?: string;
  href?: string;
  isEksternal?: boolean;
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  title?: string;
  isLoading?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isBlock?: boolean;
  hasShadow?: boolean;
}

const ButtonComponent: React.FC<PropsButton> = ({
  type = "button",
  onClick,
  target,
  href,
  isEksternal,
  children,
  className,
  isDisabled = false,
  style,
  title,
  isLoading = false,
  isSmall = false,
  isLarge = false,
  isBlock = false,
  hasShadow = false,
}) => {
  const clasName = [className];
  if (isLarge) {
    clasName.push("w-full");
  }
  if (isSmall) {
    clasName.push("w-1/2");
  }
  if (isBlock) {
    clasName.push("w-full");
  }
  if (hasShadow) {
    clasName.push("shadow-md");
  }
  if (isLoading) {
    clasName.push("opacity-50");
  }
  if (isDisabled) {
    clasName.push("cursor-not-allowed");
  }

  const classButton = clasName.join(" ");

  const handleClick = () => {
    if (isDisabled || isLoading) {
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  if (isDisabled || isLoading) {
    if (isDisabled) {
      clasName.push("cursor-not-allowed");
    }
    return (
      <span style={style}>
        {isLoading ? (
          <>
            <span className="loading-dots"></span>
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          children
        )}
      </span>
    );
  }

  if (type === "link") {
    if (isEksternal) {
      return (
        <a
          href={href}
          target={target}
          className={classButton}
          style={style}
          title={title}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link href={href || "#"} onClick={handleClick}>
          <a className={classButton} style={style} title={title}>
            {children}
          </a>
        </Link>
      );
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={isDisabled}
      style={style}
      title={title}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
