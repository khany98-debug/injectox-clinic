import Image from "next/image";

type ClinicLogoProps = {
  className?: string;
  priority?: boolean;
};

export function ClinicLogo({ className = "", priority = false }: ClinicLogoProps) {
  return (
    <span className={`clinic-logo ${className}`} aria-hidden="true">
      <Image
        src="/images/brand/injectox-clinic-logo.png"
        alt=""
        width={708}
        height={245}
        priority={priority}
        sizes="(max-width: 760px) 112px, 180px"
        className="clinic-logo-image"
      />
    </span>
  );
}
