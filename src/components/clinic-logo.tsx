type ClinicLogoProps = {
  className?: string;
};

/** Temporary, clean recreation of the clinic wall mark until official artwork is supplied. */
export function ClinicLogo({ className = "" }: ClinicLogoProps) {
  return (
    <span className={`clinic-logo ${className}`} aria-hidden="true">
      <span className="clinic-logo-name">Injectox</span>
      <span className="clinic-logo-clinic">CLINIC</span>
    </span>
  );
}
