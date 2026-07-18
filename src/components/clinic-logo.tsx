type ClinicLogoProps = {
  className?: string;
  showClinic?: boolean;
};

export function ClinicLogo({ className = "", showClinic = true }: ClinicLogoProps) {
  return (
    <span className={`clinic-logo ${className}`} aria-hidden="true">
      <span className="clinic-logo-name">Injectox</span>
      {showClinic ? <span className="clinic-logo-clinic">CLINIC</span> : null}
    </span>
  );
}
